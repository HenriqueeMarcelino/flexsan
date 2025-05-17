import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  template: `
    <div class="usuarios-container">
      <h1>Usuários</h1>
      <p>Esta é a página de usuários carregada dinamicamente.</p>
    </div>
  `,
  styles: [`
    .usuarios-container {
      padding: 20px;
      background-color: #f0f8ff;
      border-radius: 8px;
      margin: 20px;
    }
    
    h1 {
      color: #0066cc;
    }
  `]
})
export class UsuariosComponent {
  constructor() { }
}
