use std::error::Error;

mod controller;
mod models;
mod server;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    println!("Hello, world!");
    Ok(())
}
