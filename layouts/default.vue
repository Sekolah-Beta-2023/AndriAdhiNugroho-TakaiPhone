<template>
  <div>
    <HeaderComp />
    <Nuxt />
    <FooterComp />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

:root {
  --main-color: rgb(237, 238, 237);
  --bg-dark: rgb(20, 20, 20);
}

body {
  background: var(--bg-dark);
}
</style>
