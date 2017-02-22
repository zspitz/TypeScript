/// <reference path="fourslash.ts" />

// @allowJs: true
// @allowNonTsExtensions: true
// @Filename: whatever.vue
////<template>
////  <p>{{ greeting }} World!</p>
////</template>
////
////<script>
////export default {
////  data: {
////    greeting: "Hello"
////  },
////  methods: {
////      m1() {
////          console.log('hi')
////          return this.greeting
////      },
////    a1() { return this.m1() }
////  }
////}
////</script>
////
////<style>
////p {
////  font-size: 2em;
////  text-align: center;
////}
////</style>
verify.getSyntacticDiagnostics("[]");
verify.getSemanticDiagnostics(`[
  {
    "message": "Cannot find name 'console'.",
    "start": 154,
    "length": 7,
    "category": "error",
    "code": 2304
  }
]`);
