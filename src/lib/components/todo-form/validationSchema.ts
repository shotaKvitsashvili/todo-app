import * as yup from "yup";

const todoSchema = yup.object().shape({
    todoBody: yup.string().min(3, 'Type at least 3 characters').required('Mandatory field'),
    expireDate: yup.string().required(),
    priority: yup.number().required()
})

type TAddTodo = yup.InferType<typeof todoSchema>;

export {
    todoSchema,
    type TAddTodo
}