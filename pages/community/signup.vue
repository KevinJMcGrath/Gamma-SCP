<template>
    <div class="lite-layout">
        <div class="lite-body">
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 style="padding:0 20px 0 20px;">                     
                    <p class="info-header">Sign up for the Symphony Community!</p>

                    <Form ref="sponsor_form_ref" :model="sponsorForm" :rules="validation_rules" @submit.native.prevent>
                        <div class="lite-container-row" style="height:80px;">
                            <p style="margin: 10px 0 20px 0;">
                                Please enter the code provided by your sponsor organization below:
                            </p>
                            <Row type="flex" justify="center">
                                <i-col span=4 style="height:35px;">
                                    <b>Sponsor Code</b>: 
                                </i-col>
                                <i-col span=14 style="height:35px;">
                                    <FormItem prop="sponsor_code"> 
                                        <i-input v-model="input_sponsor_code"></i-input>
                                    </FormItem> 
                                </i-col>
                            </Row>
                            
                                                   
                        </div>
                    </Form>

                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 style="padding:0 20px 0 20px;">                    
                    <p>
                        In order to create you account on the Community POD as a sponsored user, we 
                        will need to obtain some additional information.<br/><br/>
                        After you have submitted your account details, you will be asked to verify your 
                        email address by clicking the link provided. If you do not see an email after about 
                        5 minutes, please check your spam folder. 
                    </p>                    
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 class="lite-col">
                    <p>
                        Once verified, you will be sent an additional email containing your username and a 
                        link to create a new password. From here you will be able to log in to the 
                        Community POD. 

                        Let us know if you have any questions: <a href="mailto:support@symphony.com">support@symphony.com</a>
                    </p>
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            <Row type="flex" justify="center">
                <i-col span=10 offset=4 class="lite-col">
                    <div class="button-box"> 
                        <button class="button-style-1 button-style-start" style="" @click="handleGetStarted()">Get Started</button>
                    </div>
                </i-col>
                <i-col span=8 class="lite-col"></i-col>
                <i-col span=2></i-col>
            </Row>
            
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

            return {
                page_title: 'Symphony - Community POD',
                sponsorForm: {
                    sponsor_code: ''
                },
                validation_rules: {
                    sponsor_code: [
                        { required: true, message: 'Required', trigger: 'blur'},
                        { validator: validateNoHTML, trigger: 'blur' }
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
            handleGetStarted() {                
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