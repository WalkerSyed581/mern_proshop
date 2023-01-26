import React,{useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Form, Button,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    let navigate = useNavigate()


    if(!shippingAddress){
        return navigate('/shipping')
    }


        

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod}))
        return navigate('/placeorder')
    }
    
    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler} >
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' 
                    name='paymentMethod' value='PayPal' checked
                    onChange ={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
        </FormContainer>
    )
}

export default PaymentScreen