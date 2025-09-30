import GrpcWebClient from "./grpcWebClient";
import { Operation } from "./generated/grpc-web_pb";

const client = new GrpcWebClient("http://localhost:10000");

document.addEventListener("DOMContentLoaded", () => {
    // Echo wiring
    const echoInput = document.getElementById("echo-input") as HTMLInputElement;
    const echoBtn = document.getElementById("echo-btn") as HTMLButtonElement;
    const echoOut = document.getElementById("echo-out") as HTMLDivElement;
    const echoSpin = document.getElementById("echo-spin") as HTMLSpanElement;
    const echoHistory = document.getElementById("echo-history") as HTMLDivElement;

    const setBusy = (btn: HTMLButtonElement, busy: boolean, spin?: HTMLElement) => {
        btn.disabled = busy;
        if (spin) spin.hidden = !busy;
    };
    const pushHistory = (msg: string, res: string) => {
        const line = document.createElement("div");
        line.textContent = `> ${msg}  →  ${res}`;
        echoHistory.prepend(line);
        while (echoHistory.childElementCount > 5) echoHistory.lastElementChild?.remove();
    };

    echoBtn.addEventListener("click", async () => {
        const message = echoInput.value.trim();
        if (!message) return;
        setBusy(echoBtn, true, echoSpin);
        echoOut.textContent = "Sending…";
        try {
            const response = await client.echo(message);
            echoOut.textContent = response;
            pushHistory(message, response);
        } catch (err: any) {
            echoOut.textContent = `Error: ${err?.message ?? "Failed"}`;
        } finally {
            setBusy(echoBtn, false, echoSpin);
        }
    });
    echoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
    });

    // Calculator wiring
    const ops = (Object.keys(Operation).filter(k => isNaN(Number(k))) as Array<keyof typeof Operation>)
        .map(k => ({ label: k, value: Operation[k] as number }));

    const a = document.getElementById("a") as HTMLInputElement;
    const b = document.getElementById("b") as HTMLInputElement;
    const sel = document.getElementById("op") as HTMLSelectElement;
    const go = document.getElementById("calc-go") as HTMLButtonElement;
    const spin = document.getElementById("calc-spin") as HTMLSpanElement;
    const ans = document.getElementById("ans") as HTMLInputElement;
    const err = document.getElementById("calc-err") as HTMLDivElement;
    const form = document.getElementById("calc-form") as HTMLFormElement;

    sel.innerHTML = "";
    for (const { label, value } of ops) {
        const o = document.createElement("option");
        o.textContent = label;
        o.value = String(value);
        sel.appendChild(o);
    }

    const parse = (s: string) => (s.trim() === "" || s === "-" || s === ".") ? NaN : Number(s);
    const numOnly = (el: HTMLInputElement) => {
        el.type = "text"; el.autocomplete = "off"; el.spellcheck = false; el.inputMode = "decimal";
        el.addEventListener("input", () => {
            const v = el.value;
            const c = v.replace(/[^\d.\-]/g, "").replace(/(?!^)-/g, "").replace(/(\..*)\./g, "$1");
            if (c !== v) el.value = c;
        });
    };
    numOnly(a); numOnly(b);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        err.textContent = ""; ans.value = "";

        const av = parse(a.value), bv = parse(b.value);
        if (Number.isNaN(av)) { err.textContent = "First number is invalid."; return; }
        if (Number.isNaN(bv)) { err.textContent = "Second number is invalid."; return; }

        setBusy(go, true, spin);
        try {
            const res = await (client as any).math(Number(sel.value), av, bv);
            ans.value = String(res);
        } catch (ex: any) {
            err.textContent = ex?.message ?? "Calculation failed.";
        } finally {
            setBusy(go, false, spin);
        }
    });
});