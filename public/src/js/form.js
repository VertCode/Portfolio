/*
  __  __           _        ____
 |  \/  |         | |      |  _ \
 | \  / | __ _  __| | ___  | |_) |_   _
 | |\/| |/ _` |/ _` |/ _ \ |  _ <| | | |
 | |  | | (_| | (_| |  __/ | |_) | |_| |
 |_|  |_|\__,_|\__,_|\___| |____/ \__, |
                                   __/ |
 __          __       _           |___/__                 _
 \ \        / /      | |            |  _ \               | |
  \ \  /\  / /__  ___| | ___ _   _  | |_) |_ __ ___ _   _| | _____ _ __ ___
   \ \/  \/ / _ \/ __| |/ _ \ | | | |  _ <| '__/ _ \ | | | |/ / _ \ '__/ __|
    \  /\  /  __/\__ \ |  __/ |_| | | |_) | | |  __/ |_| |   <  __/ |  \__ \
     \/  \/ \___||___/_|\___|\__, | |____/|_|  \___|\__,_|_|\_\___|_|  |___/
                              __/ |
                             |___/
*/

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