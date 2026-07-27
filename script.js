document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("button");

    button.addEventListener("click", (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("input");

        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.border = "2px solid #ff4d4f";
                valid = false;
            } else {
                input.style.border = "2px solid #1d4dff";
            }
        });

        if (!valid) {
            alert("يرجى تعبئة جميع الحقول");
            return;
        }

        button.innerHTML = "جاري التحقق...";
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = "تم التحقق";
            button.disabled = false;
        }, 2000);
    });

});