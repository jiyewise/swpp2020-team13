import React from 'react'
import { useForm } from 'react-hook-form'


export const CreateSignupForm = () => {
    const { register, handleSubmit, watch, errors, reset } = useForm()
    
    const onSubmit =(data, e) => { // e: event
        // console.log(data)
        reset()
    }

    
    const onError = (errors, e) => console.log(errors, e);

    watch() // watchAllFields

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label htmlFor="email">email</label>
            <input 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                ref={register({ 
                    required: true,
                    pattern: {
                        value: /S+@S+.S+/,
                        message: "Entered value does not match email format"
                    }
                })} 
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
            
            <label htmlFor="username">username</label>
            <input 
                id="username" 
                name="username" 
                placeholder="Enter username" 
                ref={register({
                    required: true,
                    minLength: {
                        value: 5,
                        message: "min length is 5"
                    }
                })} 
            />
            {errors.username && <span>This field is required</span>}
            
            <label htmlFor="password1">password</label>
            <input id="password1" name="password1" placeholder="Enter password" ref={register({ required: true })} />
            {errors.password1 && <span role="alert">{errors.password1.message}</span>}
            
            <label htmlFor="password2">password</label>
            <input id="password2" name="password2" placeholder="Confirm password" ref={register({ required: true })} />
            {errors.password2 && <span>This field is required</span>}
            
            <button type="submit">Go Submit</button>
        </form>
    )
    
}


export const CreateLoginForm = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                ref={register({ 
                    required: true,
                    pattern: {
                        value: /S+@S+.S+/,
                        message: "Entered value does not match email format"
                    }
                })} 
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}

            <label htmlFor="password">email</label>
            <input id="password" name="password" placeholder="Enter password" ref={register({ required: true })} />
            {errors.password && <span role="alert">{errors.password.message}</span>}

            <button type="submit">Go Submit</button>
        </form>
    )
}


