import { RouteLoading } from '@/routes/RouteLoading'

export function lazyRoute(loadModule, exportName = 'default') {
  return {
    HydrateFallback: RouteLoading,
    lazy: async () => {
      const routeModule = await loadModule()
      const Component = routeModule[exportName]

      if (!Component) {
        throw new Error(`Route module is missing the "${exportName}" export.`)
      }

      return { Component }
    },
  }
}
