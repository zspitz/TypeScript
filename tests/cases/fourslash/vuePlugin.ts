/// <reference path="fourslash.ts" />

// @allowJs: true
// @allowNonTsExtensions: true
// @Filename: vue.d.ts
////export declare type VueInstance<D,M,P> = D & M & P & {
////    $options: { data: D, methods: M, properties: P },
////    $data: D,
////    $parent: VueInstance<{ [s: string]: any }, { [s: string]: any }, { [s: string]: any }>
////}
////export declare var Vue: {
////    new<D,M,P>(options: { data?: D, methods?: M, properties?: P }): VueInstance<D, M, P>;
////};
/*var vexample = new Vue({
    data: {
        greeting: "Hello"
    },
    methods: {
        m1() {
            return this.greeting
        },
        a1() {
            return "thousand miles an hour"
        }
    }
});
vexample.$parent.$parent.$parent
vexample.$data.greeting
vexample.$options.properties
vexample.$options.methods
vexample.$options.data*/
// @Filename: whatever.vue
////<template>
////  <p>{{ greeting }} World!</p>
////</template>
////
////<script>
////import { Vue, VueInstance } from './vue'
////export default { /*1*/
////  data: {
////    greeting: "Hello"
////  },
////  meth/*3*/ods: {
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
verify.getSemanticDiagnostics("[]");
verify.completionsAt('1', ['properties']);
verify.completionsAt('3', ['methods', 'properties']);
