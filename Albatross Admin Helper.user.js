// ==UserScript==
// @name         Albatross Admin Helper
// @namespace    http://sda.saude.gov.br/albatross-admin
// @version      3.0
// @description  Enhanced occurrence support
// @author       dilas,zac
// @match        http://sda.saude.gov.br/albatross-admin/occurrences/new*
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