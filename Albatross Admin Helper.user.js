// ==UserScript==
// @name         Albatross Admin Helper
// @namespace    http://wharever/albatross-admin
// @version      3.0
// @description  Enhanced occurrence support
// @author       dilas,zac
// @match        http://wharever/albatross-admin/occurrences/new*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var metadata = [];
	var required = [];
    var descriptionField = $('trix-editor[input="occurrence_description_trix_input_occurrence"]')[0];
    var actionField = $('trix-editor[input="occurrence_actions_attributes_0_action_trix_input_action"]')[0];
    var evidenceField = $('trix-editor[input="occurrence_actions_attributes_0_evidence_trix_input_action"]')[0];
    var proposalField = $('trix-editor[input="occurrence_actions_attributes_0_proposal_trix_input_action"]')[0];

    $('div.row:eq( 2 )').after('<div class="row"><div class="control-group col-xs-12 col-sm-6 col-md-8 col-lg-4"><label class="control-label" for="occurrence_type">Tipo de Ocorrência:</label><div class="controls"><select class="form-control" name="occurrence_type" id="occurrence_type"><option></option></select></div></div></div><br>');
	
	
	required = $.parseJSON(
					$.ajax(
						{
						   url: "https://rawgit.com/isaacpessoa/albatross-admin-helper/master/required.json", 
						   async: false, 
						   dataType: 'json'
						}
					).responseText
				);
			
	metadata = $.parseJSON(
				$.ajax(
					{
					   url: "https://rawgit.com/isaacpessoa/albatross-admin-helper/master/meta.json", 
					   async: false, 
					   dataType: 'json'
					}
				).responseText
			);
	$.each(metadata, function(index, obj) {
            $('#occurrence_type').append(new Option(obj.title, index));
        });
	
	/*
	 $.getJSON("https://rawgit.com/isaacpessoa/albatross-admin-helper/master/required.json", function(data) {
        required = data;
    });
	
    $.getJSON("https://rawgit.com/isaacpessoa/albatross-admin-helper/master/meta.json", function(data) {
        metadata = data;

        $.each(data, function(index, obj) {
            $('#occurrence_type').append(new Option(obj.title, index));
        });
    });
	*/
    $('#occurrence_type').on('change', function (evt) {
        var optionSelected = $('option:selected', this);
        var valueSelected = this.value;

        descriptionField.editor.insertHTML(metadata[valueSelected].description);
		descriptionField.editor.insertHTML(required.description);
        actionField.editor.insertHTML(required.action);
		evidenceField.editor.insertHTML(metadata[valueSelected].tEvidence);
		evidenceField.editor.insertHTML(required.evidence);
        evidenceField.editor.insertHTML(metadata[valueSelected].evidence);
        proposalField.editor.insertHTML(metadata[valueSelected].proposal);
    });

})();


/*
  {
    "title": "Exceções",
    "description": "Exceções sendo lançadas nas páginas:",
    "action": "Ao clicar em X na página Y:",
    "evidence": "--- Evidência ---<br><br><strong>HTTP Método:</strong><br><br><strong>URI:</strong><br><br><strong>Página de Origem:</strong><br><br><strong>Classe da Exceção:</strong><br><br><strong>Mensagem da Exceção:</strong><br><br>",
    "proposal": "- Avaliar o tratamento de erro do método para melhorar a experiência com o usuário final."
  },
  {
    "title": "SELECT N+1",
    "description": "Mesma instrução de banco sendo executada diversas vezes por requisição:",
    "action": "Ao clicar em X na página Y:",
    "evidence": "--- Evidência ---<br><br><strong>HTTP Método:</strong><br><br><strong>URI:</strong><br><br><strong>Página de Origem:</strong><br><br><strong>Classe:</strong><br><br><strong>Método:</strong><br><br><strong>Instrução SQL:</strong><br><br>",
    "proposal": "- Revisar Mapeamento ORM.<br><br>- Analisar a possibilidade de grupar os argumentos passados para a instrução para utilizar o operador IN() e dessa forma executar a instrução uma única vez.<br><br>- Analisar a possibilidade de modificar as configurações do framework de ORM."
  },
  {
    "title": "Melhoria de Performance",
    "description": "Melhoria de Performance na página:",
    "action": "Ao clicar em X na página Y:",
    "evidence": "--- Evidência ---<br><br><strong>HTTP Método:</strong><br><br><strong>URI:</strong><br><br><strong>Página de Origem:</strong><br><br><strong>Classe:</strong><br><br><strong>Método:</strong><br><br><strong>Instrução SQL:</strong><br><br>",
    "proposal": "- Analisar a possibilidade de melhorar a performance da instrução.<br><br>- Analisar o plano de execução das consultas para verificar o melhor uso dos índices.<br><br>- Verificar se as estatísticas dos índices estão atualizadas."
  },
  */

