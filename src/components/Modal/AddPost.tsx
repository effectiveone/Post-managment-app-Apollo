import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Modal from './Modal'

interface ModalSchema {
  onClose: () => void;
  type: string;
  AddPosts: () => void;
}

 const AddPost = ({ onClose, type, AddPosts }: ModalSchema) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ \s-]){2,30}$/, 'Please give your dignity only letters and a space.')
      .min(3, 'The title must be at least 3 letters long')
      .required('It is obligatory to provide the title'),
    description: Yup.string()
      .matches(
        /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\.,;:!?()"'%\-]+/,
        'Please write your post. It is allowed to use letters, numbers and special characters',
      )
      .min(10, 'The message must be at least 10 characters long')
      .max(280, 'The message can be up to 280 characters long')
      .required('Please enter some message'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, formState, getValues, setValue } = useForm(formOptions )
  const { errors } = formState
  const values = getValues()

  const onSubmit = () => {
    AddPosts(values.title, values.description);
    onClose();
  }



  return (
    <Modal>
      <fieldset>
        <legend style={{ border: '1px solid black', width: '100%' }}>Add {type}</legend>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingLeft: '20px',
            justifyContent: 'flex-end',
            width: '400px',
            height: '300px',
          }}
        >
          <h2 style={{ fontSize: '28px', marginLeft: '100px', marginTop: '-20px' }}>Add {type}</h2>
          <form action="submit" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Title
              <input
                style={{ width: '100%', border: '1px solid black' }}
                {...register('title')}
                onChange={({ target: { value } }) => setValue('title', value)}
                name="title"
                type="text"
              />
            </label>
            {errors.title && <p>{errors.title.message}</p>}
            <label>
              Body:
              <textarea
                {...register('description')}
                onChange={({ target: { value } }) => setValue('description', value, {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
                name="description"
                style={{ width: '100%', border: '1px solid black' }}
              />
            </label>
            {errors.description && <p>{errors.description.message}</p>}
            <div style={{ alignSelf: 'center', gap: '20px' }}>
              <button onClick={onClose} style={{ border: '1px solid black', width: '100px', marginRight: '20px' }}>
                Cancel
              </button>
              <button type="submit" style={{ border: '1px solid black', backgroundColor: 'blue', width: '100px' }}>
                Save
              </button>
            </div>
          </form>
        </div>
      </fieldset>
    </Modal>
  )
}
export default AddPost