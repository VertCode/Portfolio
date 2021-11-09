const messages = $("#contact-section div.messages");

function submitForm(form) {
    messages[0].style.display = "hidden";
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState !== 4) return;

        let response = JSON.parse(xmlHttpRequest.response);

        messages.empty();
        messages.append(`
                    <div class="${response.success ? "success" : "error"}">
                        <p>${response.message}</p>
                    </div>
            `);

        messages[0].style.display = "block";


        setTimeout(() => {
            messages[0].style.display = "hidden";
        }, 10000)
    };
    xmlHttpRequest.open("post", form.action, true);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.send(JSON.stringify({
        fullName: form.fullName.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    }));
    return false;
}