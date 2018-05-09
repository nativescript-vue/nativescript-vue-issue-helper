<template>
    <div class="bg-blue-dark md:border-t-8 border-green">
        <div class="container flex items-center justify-between px-4 lg:px-0 mx-auto" style="max-width: 850px">
            <a href="/" class="flex items-center no-underline text-blue-lightest">
                <div class="relative w-16 h-16">
                    <img v-cloak class="w-16 h-16 absolute pin"
                         src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.svg"
                         alt="NativeScript-Vue Logo">
                    <img v-cloak class="w-16 h-16 absolute pin transition-all-ease hover:opacity-0"
                         src="https://art.nativescript-vue.org/NativeScript-Vue-Green-White.svg"
                         alt="NativeScript-Vue Logo">
                </div>
                <span class="ml-4">Issue Helper</span>
            </a>

            <ul v-if="$root.$locales.length > 1" class="list-reset flex items-center">
                <li v-for="(locale, key) in $root.$locales"
                    :key="key">
                    <a class="no-underline cursor-pointer ml-4"
                       :class="{ 'text-green': lang === key, 'text-blue-lightest': lang !== key }"
                       @click="$emit('change-lang', key)">
                        {{ locale._label }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['lang']
  }
</script>
