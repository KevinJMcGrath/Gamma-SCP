<template>
    <div class="lite-layout">
        <div class="lite-body">
        <Form ref="sponsor_form_ref" :model="sponsorForm" :rules="validation_rules" @submit.native.prevent>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 style="padding:0 20px 0 20px;">                     
                    <p class="info-header">Sign up for the Symphony Community!</p>                    
                    <div class="lite-container-row" style="height:110px">
                        <p style="margin: 10px 0 20px 0;">
                            Please enter the code provided by your sponsor organization below:
                        </p>
                        <Row type="flex" justify="center">
                            <i-col span=14 style="height:35px;">
                                Sponsor Code<br/>
                                <FormItem prop="sponsor_code"> 
                                    <i-input v-model="input_sponsor_code"></i-input>
                                </FormItem> 
                            </i-col>
                        </Row>                                                   
                    </div>
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 style="padding:0 20px 0 20px;">                    
                    <p>
                        In order to create your account on the Community POD as a sponsored user, we 
                        will need to obtain some additional information.<br/><br/>
                    </p>                    
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=6 offset=4 class="lite-col">
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
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 class="lite-col" style="height:60px;">
                    <div class="button-box" style="margin: 0 auto;"> 
                        <button class="button-style-1 button-style-start" style="" @click="handleSubmit()">Submit</button>
                    </div>
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
        </Form>
        </div>
        <symphony-footer is-absolute/>
    </div>        
</template>
<script>
    import SymphonyFooter from '~/components/SymphonyFooter.vue'
    const htmlRe = new RegExp(String.raw`</?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)/?>`)

    export default {
        layout: 'commstart',
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
                page_title: 'Symphony - Community POD',
                sponsorForm: {
                    sponsor_code: '',
                    email: '',
                    firstname: '',
                    lastname: '',
                    companyname: '',
                    accept_tandc: false

                },
                validation_rules: {
                    sponsor_code: [
                        { required: true, message: 'Required', trigger: 'blur'},
                        { validator: validateNoHTML, trigger: 'blur' }
                    ],
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
                    { hid: 'description', name: 'description', content: 'Welcome to Symphony' }
                ]
                
            }
        },
        fetch({ store, params, query, redirect, env }) {            
            
        },
        mounted: function() {
            console.log('CK (signup.vue): ' + this.$store.state.global.community_sponsor_key)

            this.sponsorForm.sponsor_code = this.$store.state.global.community_sponsor_key

        },
        methods: {
            key_handler(key_event) {               
                if (key_event.keyCode === 32) {                    
                    event.preventDefault()
                }
                else if (key_event.keyCode === 13) {
                    if (!this.loading) {
                        this.handleGetStarted()
                    }
                }
            },
            handleSubmit() {                
                this.$refs['sponsor_form_ref'].validate((valid) => {
                    if (valid)
                    {                        
                        this.$router.push({ name: "contact" });   
                    }
                    else{
                        console.log('WRONG ASSHOLE')
                    }
                })
            
            }
        },
        computed: {            
            input_sponsor_code: {
                get () {
                    return this.$store.state.global.community_sponsor_key
                },
                set (value) {
                    this.sponsorForm.sponsor_code = value;
                    this.$store.commit('SET_COMMUNITY_KEY', value)
                }
            },
            input_firstname: {
                get () {
                    return this.$store.state.user.firstname
                },
                set (value) {
                    // I'm intentionally adding side effects to make the validation rules work. Not ideal
                    this.sponsorForm.firstname = value;
                    this.$store.commit('SET_FNAME', value)
                }
            },
            input_lastname: {
                get () {
                    return this.$store.state.user.lastname
                },
                set (value) {
                    this.sponsorForm.lastname = value;
                    this.$store.commit('SET_LNAME', value)
                }
            },
            input_email: {
                get() {
                    return this.$store.state.email.email_address
                },
                set (value) {
                    this.sponsorForm.email = value;
                    this.$store.commit('SET_EMAIL', value)
                }
            },
            input_company: {
                get() {
                    return this.$store.state.company.name
                },
                set (value) {
                    this.sponsorForm.companyname = value;
                    this.$store.commit('SET_COMPANY', value)
                }
            },
            input_accept_tandc: {
                get () {
                    return this.$store.state.legal.terms_accepted
                },
                set (value) {
                    this.sponsorForm.accept_tandc = value
                    this.$store.commit('SET_TANDC', value)
                }
            }
        },
        components: {
            SymphonyFooter
        }
    }
</script>
<style scoped>
    .info-header {
        font-size: 1.6em;
        font-weight: bold;
        margin-bottom: 20px;
        color: #006caf;
    }   

    .button-box {        
        height: 45px;
        width: 190px;
        margin: 50px auto;
    }

 </style>