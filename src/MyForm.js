import React, { Component } from 'react';

class MyForm extends Component {
    
    state = { 
        gender: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        marketingAgreement: false,
        favoriteCar: '',
        isActive: false,
        formSend: '',

        errors: {
            firstName: false,
            lastName: false,
            phoneNumber: false,
            email: false,
            marketingAgreement: false,
            gender: false,
            favoriteCar: false,
            isActive: false,
        }
     }; 

     messages = {
         gender_message: 'Wybierz Pan/Pani',
         firstName_message: 'Imię musi mieć min 3 litery i nie może zawierać spacji',
         lastName_message: 'Nazwisko musi mieć min 3 litery i nie może zawierać spacji',
         phoneNumber_message: 'Numer telefonu musi składać się z 9 cyfr i nie może zawierać znaków + - . ,',
         email_message: 'Email musi składać się z conajmniej 2 znaków, zawierać znak "@" i znak "." oraz nie może zawierać spacji',
         favoriteCar_message: 'Musisz wybrać markę samochodu',
         marketingAgreement_message: 'Zaznacz zgodę marketingową',
     };

     handleChange = (e)=> {
         
         const name = e.target.name;
         const type = e.target.type;

        if(type === 'text' || type === 'number' || type === 'email') {
            const value = e.target.value;

            this.setState({
                [name]: value
         })
        } else if(type === 'checkbox') {
            const checked = e.target.checked;
            this.setState({
                [name]: checked
         })
        } else if(type === 'radio') {
            const name = e.target.name;
            const value = e.target.value;

            this.setState({
                gender:false,
                [name]: value
            })
        }
     };

     handleSelect = (e)=> {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
     };

     handleClick = ()=> {
        this.setState(prevState => ({isActive: !prevState.isActive}))
     };

    handleSubmit = (e)=> {
        e.preventDefault();
        console.log(this.state);
        const validation = this.formValidation();

        if(validation.correct) {
            this.setState({
                gender: false,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                marketingAgreement: false,
                favoriteCar: '',
                isActive: false,
                formSend: 'Formularz został wysłany',

        errors: {
            firstName: false,
            lastName: false,
            phoneNumber: false,
            email: false,
            marketingAgreement: false,
            gender: false,
            favoriteCar: false,
            isActive: false,
        }
            })
            console.log("formularz wysłany");
        } else {
            this.setState({
                errors: {
                    firstName: !validation.firstName,
                    lastName: !validation.lastName,
                    phoneNumber: !validation.phoneNumber,
                    email: !validation.email,
                    marketingAgreement: !validation.marketingAgreement,
                    gender: !validation.gender,
                    favoriteCar: !validation.favoriteCar,
                    isActive: !validation.isActive,
                }
            })
        }
    };

    formValidation() {
        let gender = false;
        let firstName = false;
        let lastName = false;
        let phoneNumber = false;
        let email = false;
        let favoriteCar = false;
        let marketingAgreement = false;
        let correct = false;

        if(this.state.gender) {
            gender = true;
        }

        if(this.state.firstName.length >= 3 && this.state.firstName.indexOf(' ') === -1) {
            firstName = true;
        }

        if(this.state.lastName.length >= 3 && this.state.lastName.indexOf(' ') === -1) {
            lastName = true;
        }

        if(this.state.phoneNumber.length === 9 && this.state.phoneNumber.indexOf('+') === -1 && this.state.phoneNumber.indexOf('-') === -1 && this.state.phoneNumber.indexOf('.') === -1 && this.state.phoneNumber.indexOf(',') === -1) {
            phoneNumber = true;
        }

        if(this.state.email.length >= 2 && this.state.email.indexOf(' ') === -1 && this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') !== -1) {
            email = true;
        }

        if(this.state.favoriteCar) {
            favoriteCar = true;
        }

        if(this.state.marketingAgreement) {
            marketingAgreement = true;
        }

        if(gender && firstName && lastName && phoneNumber && email && favoriteCar && marketingAgreement) {
            correct = true;
        }

        return({
            gender,
            firstName,
            lastName,
            phoneNumber,
            email,
            favoriteCar,
            marketingAgreement,
            correct,
        })
    };

    componentDidUpdate() {
        if(this.state.formSend !== '') {
            setTimeout(()=> this.setState({
                formSend: ''
            }), 3000)
        }
    }
    
    render() { 
        return (
            <> 
                <form 
                    className='Form' 
                    onSubmit={this.handleSubmit} 
                    noValidate
                    >
                        <div className='Box-radio'>
                        <label 
                            htmlFor="male"
                        >
                            <input 
                                className='Input-box'
                                type="radio" 
                                name='gender' 
                                id='male' 
                                value='Pan'
                                checked={this.state.gender === 'Pan'}
                                onChange={this.handleChange}
                            />
                            Pan
                        </label>
                        
                        <label 
                            htmlFor="female"
                        >
                           <input 
                                type="radio"
                                name='gender'
                                id='female'
                                value='Pani'
                                checked={this.state.gender === 'Pani'}
                                onChange={this.handleChange}
                            />
                            Pani
                        </label>
                        </div>
                        <span>
                            {this.state.errors.gender && <span>{this.messages.gender_message}</span>}
                        </span>
                        
                        <input 
                            className='Input'
                            type="text" 
                            name='firstName' 
                            placeholder='Imię' 
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                        <span>
                            {this.state.errors.firstName && <span>{this.messages.firstName_message}</span>}
                        </span>
                        
                        <input 
                            className='Input'
                            type="text" 
                            name='lastName' 
                            placeholder='Nazwisko' 
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                        <span>
                            {this.state.errors.lastName && <span>{this.messages.lastName_message}</span>}
                        </span>

                        <input 
                            className='Input'
                            type="number" 
                            name='phoneNumber' 
                            placeholder='Telefon' 
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            />
                            <span>
                                {this.state.errors.phoneNumber && <span>{this.messages.phoneNumber_message}</span>}
                            </span>

                        <input 
                            className='Input'
                            type="email" 
                            name='email' 
                            placeholder='Email' 
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <span>
                            {this.state.errors.email && <span>{this.messages.email_message}</span>}
                        </span>

                        <label htmlFor="favoriteCar"> Ulubiona marka samochodów
                            <select name="favoriteCar" id="favoriteCar" onChange={this.handleSelect}>
                                <option value="">Wybór</option>
                                <option value="Audi">Audi</option>
                                <option value="BMW">BMW</option>
                                <option value="Dacia">Dacia</option>
                                <option value="VW">VW</option>
                            </select>
                        </label>

                        <span>
                            {this.state.errors.favoriteCar && <span>{this.messages.favoriteCar_message}</span>}
                        </span>
                        <div className='Box-marketing-agreement'>
                        <input 
                            type="checkbox" 
                            id='marketingAgreement'
                            name='marketingAgreement'
                            checked={this.state.marketingAgreement}
                            onChange={this.handleChange}
                            />
                        <p 
                            className={this.state.isActive ? 'Long-text' : 'Short-text'}
                            htmlFor="marketingAgreement"
                        >
                            Wyrażam dożywotnią zgodę marketingową na wszystko o czym marzycie... 
                            {this.state.isActive ? <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias deleniti laboriosam ex labore omnis ullam asperiores architecto voluptas nulla molestiae cumque ipsam minus quidem doloribus nisi aliquid, cum odit quis?</p> : null}
                            <button 
                                type='button' 
                                onClick={this.handleClick}>
                                    {this.state.isActive ? 'Zamknij' : 'Więcej'}
                            </button>
                        </p>
                        </div>
                        <span>
                            {this.state.errors.marketingAgreement && <span>{this.messages.marketingAgreement_message}</span>}
                        </span>

                        <button type='submit'>Wyślij</button>
                </form>
                {this.state.formSend && <h3>{this.state.formSend}</h3>}
            </> 
        );
    }
}
 
export default MyForm;