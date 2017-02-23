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
////    new<D,M extends { [s: string]: (this: D, ...args: any[]) => any },P>(options: { data?: D, methods?: M, properties?: P }): VueInstance<D, M, P>;
////};
/*
export declare type VueInstance<D,M,P> = D & M & P & {
    $options: { data: D, methods: M, properties: P },
    $data: D,
    $parent: VueInstance<{ [s: string]: any }, { [s: string]: any }, { [s: string]: any }>
}
export declare var Vue: {
    new<D,M extends { [s: string]: (this: D, ...args: any[]) => any },P>(options: { data?: D, methods?: M, properties?: P }): VueInstance<D, M, P>;
};
var vexample = new Vue({
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
vexample.$options.data
*/
// @Filename: whatever.vue
////<template>
////  <p>{{ greeting }} World!</p>
////</template>
////
////<script>
////export /*0*/default { /*1*/
////  data: {
////    greeting: "Hello"
////  },
////  meth/*3*/ods: {
////      m1() {
////          //console.lozenge('hi')
////          return th/*2*/is.gr/*4*/eeting
////      },
////    a1() { return this.greeting /* .m1() */ }
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
goTo.marker('0');
verify.getSyntacticDiagnostics("[]");
verify.getSemanticDiagnostics(`[]`);
verify.completionsAt('1', ['properties']);
verify.completionsAt('3', ['methods', 'properties']);
verify.quickInfoAt('2', `this: {
    greeting: string;
}`);
verify.quickInfoAt('4', `(property) greeting: string`);
