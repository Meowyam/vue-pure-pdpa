<template>
<nav class="navbar">
    <div class="container">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <router-link class="navbar-item" to="/">Home</router-link>
            </a>
            <span class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
        <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
                <router-link class="navbar-item" to="/about">About</router-link>
                <router-link class="navbar-item" to="/editor">Editor</router-link>
            </div>
        </div>
    </div>
</nav>
<router-view />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
