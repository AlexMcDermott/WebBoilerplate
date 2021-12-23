use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn say_hello() {
  console::log_1(&"Hello".into());
}
