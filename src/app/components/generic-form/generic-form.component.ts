import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="generic-form-container">
      <h1>{{ formTitle }}</h1>
      <div class="form-content">
        <p>Componente genérico para: <strong>{{ formId }}</strong></p>
        <p>Este componente será renderizado para diferentes rotas de cadastro.</p>
        <p>No futuro, este componente carregará a configuração específica do formulário baseado no ID.</p>
        
        <div class="placeholder-form">
          <div class="form-info">
            <p><strong>Tipo:</strong> {{ formType }}</p>
            <p><strong>Módulo:</strong> {{ formModule }}</p>
          </div>
          
          <div class="form-placeholder">
            <p>Aqui será renderizado o formulário dinâmico baseado na configuração JSON</p>
            <div class="mock-fields">
              <div class="mock-field">
                <label>Campo 1</label>
                <input type="text" disabled placeholder="Campo de exemplo">
              </div>
              <div class="mock-field">
                <label>Campo 2</label>
                <input type="text" disabled placeholder="Campo de exemplo">
              </div>
              <div class="mock-field">
                <label>Campo 3</label>
                <select disabled>
                  <option>Opção 1</option>
                  <option>Opção 2</option>
                </select>
              </div>
            </div>
            <div class="mock-buttons">
              <button class="mock-button">Salvar</button>
              <button class="mock-button">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .generic-form-container {
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin: 20px;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .form-content {
      padding: 10px;
    }
    
    .placeholder-form {
      margin-top: 20px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 6px;
      border: 1px dashed #ccc;
    }
    
    .form-info {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #e9f7fe;
      border-radius: 4px;
    }
    
    .mock-fields {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 20px 0;
    }
    
    .mock-field {
      display: flex;
      flex-direction: column;
    }
    
    .mock-field label {
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    
    .mock-field input, .mock-field select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f5f5f5;
    }
    
    .mock-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .mock-button {
      padding: 8px 16px;
      background-color: #4a6da7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: not-allowed;
      opacity: 0.7;
    }
    
    .mock-button:last-child {
      background-color: #6c757d;
    }
  `]
})
export class GenericFormComponent implements OnInit {
  formId: string = '';
  formTitle: string = 'Formulário Dinâmico';
  formType: string = 'Cadastro';
  formModule: string = 'Administração';
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Captura os dados da rota
    this.route.data.subscribe(data => {
      if (data['formId']) {
        this.formId = data['formId'];
        this.formTitle = data['title'] || this.formatFormTitle(this.formId);
        this.updateFormInfo(this.formId);
      }
    });
  }
  
  private updateFormInfo(formId: string) {
    // Aqui você poderia carregar a configuração específica do formulário
    // baseado no ID, de um serviço ou API
    
    // Simulação de diferentes tipos de formulário baseado no ID
    if (formId.includes('feriado')) {
      this.formType = 'Cadastro de Feriado';
      this.formModule = 'Calendário';
    } else if (formId.includes('hidrometro')) {
      this.formType = 'Cadastro de Hidrômetro';
      this.formModule = 'Medição';
    } else if (formId.includes('medidor')) {
      this.formType = 'Cadastro de Modelo de Medidor';
      this.formModule = 'Equipamentos';
    } else {
      this.formType = 'Cadastro Genérico';
      this.formModule = 'Sistema';
    }
  }
  
  private formatFormTitle(formId: string): string {
    // Converte "cadastro-de-feriado" para "Cadastro de Feriado"
    return formId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
