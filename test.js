function a() {
  setTimeout(() => {
    return true
  }, 1000);
}

if (a()) {
  console.log(1)
}