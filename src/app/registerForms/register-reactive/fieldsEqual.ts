import { AbstractControl } from "@angular/forms"

export function fieldsEqual(field1, field2, errorName) {
    return (c: AbstractControl) => {
        const error = {}
        error[errorName] = true
        if (c.get(field1).value && c.get(field2).value && c.get(field1).value === c.get(field2).value) { return null }
        return error
    }
}