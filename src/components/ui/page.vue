<template>
  <div class="page relative">
    <Transition
      name="slide"
      mode="out-in"
    >
      <slot name="menu" />
    </Transition>

    <header class="header">
      <div class="container">
        <slot name="header" />
      </div>
    </header>

    <div class="messages">
      <slot name="messages" />
    </div>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <Transition name="fade">
      <div
        v-if="$slots.popup"
        class="absolute full bg-inverse-alpha"
      />
    </Transition>

    <Transition name="slide-top">
      <slot name="popup" />
    </Transition>

    <footer class="footer">
      <div class="container">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UiPage'
}
</script>
