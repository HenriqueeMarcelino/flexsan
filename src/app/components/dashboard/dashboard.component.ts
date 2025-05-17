import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Esta é a página de dashboard carregada dinamicamente.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin: 20px;
    }
    
    h1 {
      color: #333;
    }
  `]
})
export class DashboardComponent {
  constructor() { }
}
