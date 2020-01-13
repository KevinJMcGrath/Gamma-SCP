<template>
    <div class="lite-layout">
        <div class="lite-body">
            <Row type="flex" justify="center">                
                <i-col span=10 offset=4 class="lite-col" >
                    <Form ref="contact_form_ref" :model="contactForm" :rules="validation_rules" @submit.native.prevent>
                        <div class="lite-container-row" style="height: 60px;"> 
                            Email Address<br/>
                            <FormItem prop="email"> 
                                <i-input v-model="input_email"></i-input>
                            </FormItem>
                        </div>
                        <div class="lite-container-row" style="height: 60px;"> 
                            <Row :gutter="4">
                                <i-col span=12>
                                    First Name<br/>
                                    <FormItem prop="firstname"> 
                                        <i-input v-model="input_firstname"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span=12>
                                    Last Name<br/>
                                    <FormItem prop="lastname"> 
                                        <i-input v-model="input_lastname"></i-input>
                                    </FormItem>
                                </i-col>                                    
                            </Row>
                        </div>
                        <div class="lite-container-row" style="height: 60px;"> 
                            Company Name<br/>
                            <FormItem prop="companyname"> 
                                <i-input v-model="input_company"></i-input>
                            </FormItem>                            
                        </div>
                        <div class="lite-container-row" style="height: 40px;">
                            <FormItem prop="tandc" style="height:25px"> 
                                <label for="tandc_check" style="height:25px">
                                    <input ref="tandc_cb" type="checkbox" v-model="input_accept_tandc" name="tandc_check"/>
                                    <span> I have read and agree to the <a class="lite-link-button" href="/Symphony_Services_Agreement.pdf" target="_blank">Symphony Services Agreement</a></span>
                                </label>
                            </FormItem>
                        </div>
                        <div>
                            <button class="button-style-1" style="height: 32px; width: 100px;" @click="handleGotoValidate()">Submit</button>
                        </div>
                    </Form>
                </i-col>
                <i-col span=8 class="lite-col">
                   
                </i-col>
                <i-col span=2></i-col>
            </Row>
        </div>
        <symphony-footer v-bind:is-absolute="false"/>
    </div>  
</template>
<script>    
    import SymphonyFooter from '~/components/SymphonyFooter.vue'
    const htmlRe = new RegExp(String.raw`</?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)/?>`)

    export default {
        layout: 'community',
        data() {
             const validateNoHTML = (rule, value, callback) => {
                if (htmlRe.test(value) === true) {
                    callback(new Error('Invalid format.'))
                }
                else {
                    callback()
                }
            };

            const validateTandC = (rule, value, callback) => {                
                if (this.$refs['tandc_cb'].checked === true)
                {
                    callback();
                }
                else
                {
                    callback(new Error('We need your agreement to continue.'));
                }                
            };

            const validateFreemail = (rule, value, callback) => {
                if (value !== '') //&& value !== 'kevinmcgr@gmail.com')
                {
                    var re = '[a-zA-Z_\\.-]+@((hotmail)|(yahoo)|(gmail))\\.[a-z]{2,4}';
                    if (value.toLowerCase().match(re)) {
                        this.loading = false
                        callback(new Error('Business domain email addresses only.'));    
                        
                    }
                    else {
                        callback();
                    }          

                }
                else
                {
                    // the required field validator will hopefully catch this.
                    callback();
                }
            };

            return {
                page_title: 'Symphony - Contact',
                error_state: false,
                contactForm: {
                    email: '',
                    firstname: '',
                    lastname: '',
                    companyname: '',
                    accept_tandc: false
                },
                validation_rules: {
                    email: [
                        { required: true, message: 'Required', trigger: 'blur'},
                        { type: 'email', message: 'Invalid email format', trigger: 'blur'},
                        { type: 'string', 'min': 1, 'max': 100, message: 'Email address must be less than 50 characters.', trigger: 'blur'},
                        { validator: validateFreemail, trigger: 'blur'}
                    ], 
                    firstname: [
                        { required: true, message: 'Required', trigger: 'blur'},
                        { type: 'string', 'min': 1, 'max': 50, message: 'First Name must be less than 50 characters.', trigger: 'blur'},
                        { validator: validateNoHTML, trigger: 'blur' }
                    ],
                    lastname: [
                        { required: true, message: 'Required', trigger: 'blur'},
                        { type: 'string', 'min': 1, 'max': 50, message: 'Last Name must be less than 50 characters.', trigger: 'blur'},
                        { validator: validateNoHTML, trigger: 'blur' }
                    ],
                    companyname: [
                        { required: true, message: 'Required', trigger: 'blur' },
                        { type: 'string', 'min': 1, 'max': 100, message: 'Company Name must be less than 100 characters.', trigger: 'blur'},
                        { validator: validateNoHTML, trigger: 'blur' }
                    ],
                    tandc: [ 
                        { validator: validateTandC, trigger: 'change' } 
                    ]
                }
            }
        },
        head() {
            return {
                title: this.page_title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Use this page to enter contact details for the initial user.' }
                ]
                
            }
        },
        async fetch({ store, params, query, redirect, env }) {            
        },
        mounted: function() {
            this.input_firstname = this.$store.state.user.firstname
            this.input_lastname = this.$store.state.user.lastname
            this.input_company = this.$store.state.company.name
        },
        computed: {
            // Using computed properties for two-way binding with Vuex
            input_firstname: {
                get () {
                    return this.$store.state.user.firstname
                },
                set (value) {
                    // I'm intentionally adding side effects to make the validation rules work. Not ideal
                    this.contactForm.firstname = value;
                    this.$store.commit('SET_FNAME', value)
                }
            },
            input_lastname: {
                get () {
                    return this.$store.state.user.lastname
                },
                set (value) {
                    this.contactForm.lastname = value;
                    this.$store.commit('SET_LNAME', value)
                }
            },
            input_email: {
                get() {
                    return this.$store.state.email.email_address
                },
                set (value) {
                    this.contactForm.email = value;
                    this.$store.commit('SET_EMAIL', value)
                }
            },
            input_company: {
                get() {
                    return this.$store.state.company.name
                },
                set (value) {
                    this.contactForm.companyname = value;
                    this.$store.commit('SET_COMPANY', value)
                }
            },
            input_accept_tandc: {
                get () {
                    return this.$store.state.legal.terms_accepted
                },
                set (value) {
                    this.contactForm.accept_tandc = value
                    this.$store.commit('SET_TANDC', value)
                }
            }
        },
        methods: {
            handleGotoValidate () {
                this.$refs['contact_form_ref'].validate((valid) => {
                    if (valid)
                    {
                        console.log('Submitting SCP Sponsored Request')
                        //Shouldn't need to pass email address - I'm saving it to the store already
                        this.$store.dispatch('domain_check').then((result) => {

                            if (result.success)
                            {
                                this.$store.dispatch('submitSCPSponsored').then((result) => {

                                    if (result == 0) {
                                        this.$router.push({name: "thankyou"}) 
                                    }

                                }, error => {
                                    console.log('submit SCP Sponsored error')
                                    console.log(error)
                                })
                            }
                            else
                            {
                                this.$Modal.error({
                                    title: 'Domain Error',
                                    content: 'Email address must be corporate issued and not freemail or disposable.',
                                    onOk: () => {
                                        
                                    }, 
                                    okText: 'Ok'
                                })
                            }

                        }, error => {
                            console.log('domain check error')
                            console.log(error)                            
                        })

                        /*
                        this.$store.dispatch('submitPurchase').then((result) => {
                            console.log(result)

                            if (result == 0) {
                                this.$router.push({name: "thankyou"}) 
                            }
                            else if (result == -1) {
                                this.$router.push({name: "thankyou"}) 
                            }
                            else if (result == -2) {
                                this.$Modal.warning({
                                    title: 'Submission Pending',
                                    content: 'This account is already pending. You will receive a confirmation soon.',
                                    onOk: () => {
                                        
                                    }, 
                                    okText: 'Ok'
                                })
                            }
                            else {
                                this.$Modal.error({
                                    title: 'Error',
                                    content: 'There was an error submitting your request. Please contact Symphony sales.',
                                    onOk: () => {
                                        
                                    }, 
                                    okText: 'Ok'
                                })
                            }
                        })
                        */


                        
                    }
                })
            }

        },
        components: {
            SymphonyFooter
        }
    }
</script>
<style>

</style>