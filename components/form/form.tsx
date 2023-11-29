import React, { FC, useState, useContext } from 'react'
import Context from 'WNTR/utils/context'
import { Form as BSForm, Button } from 'react-bootstrap'
import { Loading } from 'WNTR/components'
import { IField, IForm } from 'WNTR/interfaces'
import axios from 'axios'

const component = {
    name: 'wntrFormComponent'
}

const Form: FC = () => {

    const form = useContext(Context).website?.form as IForm
    type FieldTypes = Record<string, string>
    
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const fieldTypes: FieldTypes = form?.fieldTypes

    const handleCheck = () => {

    }

    const handleSubmit = async (event: React.FormEvent<IHTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)

        const data: { [key: string]: string } = {}

        form?.fields?.map(field => data[field?.alias] = event.currentTarget.elements[field.alias]?.value)

        await axios.post('/api/form/submit', data, { headers: { 'Id': form.id } }).then(res => {
            if(res.data) {
                setSubmitted(true)
            }
        })
    }

    return form ? (
        <BSForm id={form?.id} onSubmit={handleSubmit} data-success-message={form?.messageOnSubmit} className={`${component.name} ${component.name}-${submitting && !submitted ? 'submitting' : 'clean'} ${component.name}-${submitted ? 'submitted' : 'clean'}`}>
            { form?.fields?.map(field => <FormField key={field?.id} {...field} fieldType={fieldTypes[field?.fieldTypeId]} submitting={submitting} />) }
            <BSForm.Group className={`${component.name}__field`}>
                <Button className={`${component.name}__button`} type="submit" disabled={submitting}>{form?.submitLabel}</Button>
            </BSForm.Group>
            { submitting && !submitted ? <Loading height="100%" position="absolute" background="transparent" /> : null }
        </BSForm>
    ) : null
}

const FormField: FC<IField> = (field) => {
    const controls: { [key: string]: any } = {
        "shortAnswer": ShortAnswer,
        "longAnswer": LongAnswer
    }
    const Control = controls[field.fieldType]
    return <Control {...field} />
}

const ShortAnswer: FC<IField> = (field) => {
    return (
        <BSForm.Group className={`${component.name}__field`} controlId={field.id}>
            <BSForm.Label className={`${field.settings.showLabel ? null : 'visually-hidden'}`}>{field.caption}</BSForm.Label>
            <BSForm.Control
                type={field.settings.fieldType}
                name={field.alias}
                placeholder={field.placeholder}
                disabled={field.submitting}
                required={field.mandatory}
            />
        </BSForm.Group>
    )
}

const LongAnswer: FC<IField> = (field) => {
    return (
        <BSForm.Group className={`${component.name}__field`} controlId={field.id}>
            <BSForm.Label className={`${field.settings.showLabel ? null : 'visually-hidden'}`}>{field.caption}</BSForm.Label>
            <BSForm.Control
                as="textarea"
                name={field.alias}
                rows={field.settings.numberOfRows}
                placeholder={field.placeholder}
                disabled={field.submitting}
                required={field.mandatory}
            />
        </BSForm.Group>
    )
}

export interface IHTMLFormElement extends HTMLFormElement {
    readonly elements: IHTMLFormControlsCollection;
}

interface IHTMLFormControlsCollection extends HTMLFormControlsCollection {
    [key: string]: HTMLInputElement | any;
}

export default Form