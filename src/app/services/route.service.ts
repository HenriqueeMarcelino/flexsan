import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface RouteConfig {
  path: string;
  redirectTo?: string;
  pathMatch?: string;
  title?: string;
  icon?: string;
  loadComponent?: string;
  type?: 'specific' | 'generic';
  formId?: string;
  children?: RouteConfig[];
}

export interface RoutesConfig {
  routes: RouteConfig[];
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private routesConfig: RoutesConfig | null = null;

  loadRoutes(): Observable<RoutesConfig> {
    return this.http.get<RoutesConfig>('/assets/data/routes.json').pipe(
      tap(config => {
        this.routesConfig = config;
        this.updateRoutes();
      })
    );
  }

  getRoutes(): RouteConfig[] {
    return this.routesConfig?.routes || [];
  }

  private updateRoutes(): void {
    if (!this.routesConfig) return;

    const routes: Routes = this.mapConfigToRoutes(this.routesConfig.routes);
    
    // Adiciona uma rota wildcard para capturar todas as rotas não encontradas
    routes.push({ path: '**', redirectTo: 'dashboard' });
    
    // Redefine as rotas do router
    this.router.resetConfig(routes);
  }

  private mapConfigToRoutes(routesConfig: RouteConfig[]): Routes {
    return routesConfig.map(route => {
      const angularRoute: any = {
        path: route.path
      };

      if (route.redirectTo) {
        angularRoute.redirectTo = route.redirectTo;
        angularRoute.pathMatch = route.pathMatch || 'prefix';
      } else if (route.type === 'generic') {
        // Rotas genéricas usam o componente GenericFormComponent
        angularRoute.loadComponent = () => import('../components/generic-form/generic-form.component').then(m => m.GenericFormComponent);
        
        // Adiciona os dados da rota para serem acessados pelo componente
        angularRoute.data = { 
          formId: route.formId,
          title: route.title
        };
      } else if (route.loadComponent) {
        // Rotas específicas carregam seus próprios componentes
        const componentPath = route.loadComponent.toLowerCase();
        angularRoute.loadComponent = () => import('../components/' + componentPath + '/' + componentPath + '.component').then(m => {
          const componentName = route.loadComponent as string;
          return m[componentName];
        });
      }

      if (route.children) {
        angularRoute.children = this.mapConfigToRoutes(route.children);
      }

      return angularRoute;
    });
  }
}
