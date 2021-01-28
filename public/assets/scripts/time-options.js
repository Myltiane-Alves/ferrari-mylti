import { format, parse } from "date-fns"
import { appendTemplate, getFormValues, getQueryString, setFormValues } from "./utils"
import { firebase } from './firebase-app';
import { ptBR } from 'date-fns/locale'


const renderTimeOptions = (context, timeOptions) => {

    const targetElement = context.querySelector(".options")

    targetElement.innerHTML = ""

    timeOptions.forEach(item => {

        appendTemplate(
            targetElement,
            "label",
            `
                <input type="radio" name="option" value="${item.value}" />
                <span>${item.value}</span>
            `
        )

    })

}

const validateSubmitForm = context => {

    const button = context.querySelector("[type=submit]")

    const checkValue = () => {

        if (context.querySelector("[name=option]:checked")) {
            button.disabled = false
        } else {
            button.disabled = true
        }

    }

    window.addEventListener('load', e => checkValue())

    context.querySelectorAll("[name=option]").forEach(input => {

        input.addEventListener("change", e => {

            //button.disabled = !context.querySelector("[name=option]:checked")
            checkValue()            

        })

    })

    context.querySelector("form").addEventListener("submit", e => {

        if (!context.querySelector("[name=option]:checked")) {
            button.disabled = true
            e.preventDefault()
        }

    })

}

document.querySelectorAll("#time-options").forEach(page => {

    const auth = firebase.auth()
    const db = firebase.firestore();

    auth.onAuthStateChanged(user => {

        db.collection('time-options').onSnapshot(snapshot => {

            const timeOptions = [];
    
            snapshot.forEach(item => {
    
                timeOptions.push(item.data());
            })
    
            renderTimeOptions(page, timeOptions)
    
            validateSubmitForm(page)
            
        }, onSnapshotError);

    });

    const params = getQueryString()
    const title = page.querySelector("h3")
    const form = page.querySelector("form")
    const scheduleAt = parse(params.schedule_at, "yyyy-MM-dd", new Date())

    if (scheduleAt.toString() === 'Invalid Date') {
        window.history.back(-1)
    }

    setFormValues(form, params)

    title.innerHTML = format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR})

})