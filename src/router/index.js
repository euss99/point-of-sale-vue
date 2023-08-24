import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("../views/admin/ProductsView.vue"),
        },
        {
          path: "products/new",
          name: "new-product",
          component: () => import("../views/admin/NewProductView.vue"),
        },
        {
          path: "products/edit/:id",
          name: "edit-product",
          component: () => import("../views/admin/EditProductView.vue"),
        },
        {
          path: "products/seeder",
          name: "seed-product",
          component: () => import("../views/admin/SeederView.vue"),
        },
        {
          path: "sales",
          name: "sales",
          component: () => import("../views/admin/SalesView.vue"),
        },
      ],
    },
  ],
});

export default router;
