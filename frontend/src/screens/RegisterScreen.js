import React,{useState,useEffect} from 'react'
import { Link,useSearchParams,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
	const [name,setName] =useState('')
	const [email,setEmail] =useState('')
	const [password,setPassword] =useState('')
	const [confirmPassword,setConfirmPassword] =useState('')
	const [message,setMessage] =useState(null)


	const dispatch = useDispatch()

	const userRegister = useSelector(state => state.userRegister)
	const { loading,error,userInfo } = userRegister
	
	let [searchParams, setSearchParams] = useSearchParams();
	let redirect =  searchParams.get('redirect')
	redirect = redirect ? '/' + redirect : '/'

	
	let navigate = useNavigate()

	useEffect(() => {
		if(userInfo){
			return navigate(redirect)
		}
	},[navigate,userInfo,redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		if(password !== confirmPassword ){
			setMessage('Passwords do not math')
		} else {
			dispatch(register(name,email,password))
		}

	}
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control 
					type='name' 
					placeholde='Enter name' 
					value={name} 
					onChange={(e)=> setName(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control 
					type='email' 
					placeholde='Enter email' 
					value={email} 
					onChange={(e)=> setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control 
					type='password' 
					placeholde='Enter password' 
					value={password} 
					onChange={(e)=> setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control 
					type='confirmPassword' 
					placeholde='Confirm password' 
					value={password} 
					onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`
					: '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
  )
}

export default RegisterScreen