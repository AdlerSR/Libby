var onloadCallback = function() {
    grecaptcha.render('google_recaptcha', {
        'sitekey' : '6LdBFbMUAAAAAJtLpy5DoRafqEP0NBmt9zRXAzNf'
    });
};

const api = axios.create({
    baseURL: 'https://fathomless-gorge-46000.herokuapp.com/'
});

$(function () {

    function checkValues() {
        var nome = $('#nome').val();
        var email = $('#email').val();
        var assunto = $('#assunto').val();
        var mensagem = $('#mensagem').val();

        if(nome == "" ||  email == "" ||  assunto == "" || mensagem == ""){
            return false;
        }else{
            return true;
        };
    }

    $("#button").click(() =>{
        if(checkValues()){
            var reCAPTCHA = grecaptcha.getResponse();
            if(reCAPTCHA.length){
                $("#button").prop("disabled", true);
                $("#button").html('carregando');

                SubmitMessege();
            }else{
                errorMessege("reCAPTCHA é obrigatorio");
            }
        }else{
            errorMessege("Todos os campos são obrigatorios");
        }
    });

    function errorMessege(message){
        $("#message").stop().slideDown().html(message).delay(1500).slideUp();
    }

    async function SubmitMessege(){
        var nome = $('#nome').val();
        var email = $('#email').val();
        var assunto = $('#assunto').val();
        var mensagem = $('#mensagem').val();

        const response = await api.post('/email', {
            email,
            nome,
            assunto,
            mensagem
        }).catch((error)=>{
            errorMessege("Erro ao enviar");
            $("#button").prop("disabled", false);
            $("#button").html('Enviar');
        });

        if(response.status === 200){
            $('#button').html("Enviado")

        }else if(response.status === 400){
            errorMessege("Erro ao enviar");
            $("#button").prop("disabled", false);
            $("#button").html('Enviar');
        }
    }
});