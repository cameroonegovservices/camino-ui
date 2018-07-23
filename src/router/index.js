import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import NProgress from 'nprogress'
import Titre from '../components/titre.vue'
// import TitleDetails from '../components/TitleDetails.vue'
import Titres from '../components/titres.vue'
import Error from '../components/error.vue'
import About from '../components/camino-content/about.vue'
import Accessibilite from '../components/camino-content/accessibilite.vue'

Vue.use(VueRouter)

Vue.use(VueMeta, { keyName: 'page' })

const routes = [
  {
    path: '/titres',
    name: 'titres',
    component: Titres
  },
  {
    path: '/titres/:id',
    name: 'titre',
    component: Titre
    // children: [
    //   {
    //     path: 'activite',
    //     name: 'activite',
    //     component: TitleDetails
    //   }
    // ]
  },
  {
    path: '/a-propos',
    name: 'a-propos',
    component: About
  },
  {
    path: '/accessibilite',
    name: 'accessibilite',
    component: Accessibilite
  },
  {
    path: '/Erreur',
    name: 'error',
    component: Error,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true
  },
  {
    path: '/',
    redirect: 'titres'
  },
  {
    path: '*',
    redirect: 'error'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((routeTo, routeFrom, next) => {
  if (routeFrom.name) {
    NProgress.start()
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
