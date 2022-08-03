<template>
<frame id="userview">
  <Page actionBarHidden="true">    
    <ActionBar  style="background-color">          
      <Label text="User View"  horizontalAlignment="center" verticalAlignment="top" />                      
    </ActionBar>
    
    <GridLayout rows="auto, *" columns="*">
            <StackLayout class="form" row="0" col="0">
                <StackLayout class="input-field">
                    <Label text="First Name" class="label font-weight-bold m-b-5" />
                    <TextField class="input" v-model="input.firstname" />
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Last Name" class="label font-weight-bold m-b-5" />
                    <TextField class="input" v-model="input.lastname" />
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <GridLayout rows="auto, auto" columns="*, *">
                    <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
                    <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1"  />
                    <Button text="Clear" @tap="clear" class="btn btn-primary" row="1" col="0" colSpan="2"  />
                </GridLayout>
            </StackLayout>            
            <ListView for="person in this.$store.state.db.data" class="list-group" row="1" col="0">
                <v-template>
                    <StackLayout class="list-group-item">
                        <Label v-bind:text="person.firstname + ' ' + person.lastname" />
                    </StackLayout>
                </v-template>
            </ListView>
        </GridLayout>
  </Page>
</frame>
</template>

<script>
 
  export default{
    
    data() {
        return {
            input: {
                firstname: "",
                lastname: ""
            }
        }
    },         
    methods: {
        save() {                       
            this.$store.dispatch("db/insert", this.input);
        },
        load() {
            this.$store.dispatch("db/query");
        },
        clear() {
            this.input.firstname = "";
            this.input.lastname = "";
        }
    }  
    
  };
</script>


<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .item{
        border-radius: 10;
        border-width: 1;
        color:#3B5997;
        margin: 20;
        font-size: 13;
        border-color: #2b3c6a;
        background-color: white;        
    }
</style>
