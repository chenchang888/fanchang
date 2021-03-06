import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/column",
    name: "Column",
    component: () =>
      import("../views/CompanyColumn/Column.vue")
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import("../views/List/List.vue")
  },
  {
    path: "/details",
    name: "Details",
    component: () =>
      import("../views/Details/Details.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
