export const Test = (questions, handleSubmit) => {
    const $form = document.createElement("form");
    $form.addEventListener("submit", (e) => handleSubmit(e));

    questions.forEach(question => {
        const $question = document.createElement("div");
        
        const $title = document.createElement("h3");
        $title.textContent = question.question;
        $question.appendChild($title);

        if (question.options) {
            question.options.forEach(option => {
                const $radio = document.createElement("input");
                $radio.type = "radio";
                $radio.id = encodeURI(question.question + option.answer);
                $radio.value = option.value;
                $radio.name = encodeURI(question.question);
    
                const $label = document.createElement("label");
                $label.appendChild($radio);
                $label.htmlFor = encodeURI(question.question + option.answer);
                $label.innerHTML += option.answer;
    
                $question.appendChild($label);
            });
        } else if (question.range) {
            const [min, max] = question.range;
            const $span = document.createElement("span");
            $span.textContent = min;

            const $range = document.createElement("input");
            $range.type = "range";
            $range.step = 10;
            $range.min = min;
            $range.max = max;
            $range.defaultValue = min;

            $range.addEventListener("input", () => $span.textContent = $range.value / 10);

            $question.appendChild($span);
            $question.appendChild($range);
        }

        $form.appendChild($question);
    });

    const $submit = document.createElement("button");
    $submit.type = "submit";
    $submit.textContent = "Enviar";
    $form.appendChild($submit);

    return $form;
}