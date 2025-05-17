import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [],
  template: `
    <div class="configuracoes-container">
      <h1>Configurações</h1>
      <p>Esta é a página de configurações carregada dinamicamente.</p>
    </div>
  `,
  styles: [`
    .configuracoes-container {
      padding: 20px;
      background-color: #f0fff0;
      border-radius: 8px;
      margin: 20px;
    }
    
    h1 {
      color: #006400;
    }
  `]
})
export class ConfiguracoesComponent {
  constructor() { }
}
