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
        $("#message").html(`<div class="position-absolute w-100 d-flex flex-column p-4">
        <div class="toastTransition toast ml-auto" role="alert" data-delay="700" data-autohide="false">
            <div class="toast-header">
                <strong class="mr-auto toastText">Aviso <i class="fas fa-exclamation-triangle"></i></strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                </button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
            </div>
        </div>`);

        setTimeout(()=>{
            $("#message").html('');
        }, 3000);

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