<template lang="html">
    <Page>
        <ActionBar style="background-color">
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label text="앱 정보" />
        </ActionBar>
        <GridLayout rows="*,*,*,*,*">
            <GridLayout row="1" rowSpan="3" rows="*,auto,*">
                <Image row="0" src="~/images/LOGO_JBCD_1.png" width="70%" @tap="easterEgg()" verticalAlignment="bottom"/>
                <Label row="1" :text="isLatest()" horizontalAlignment="center" verticalAlignment="top" marginTop="10" style="font-size:16px;" />
                <Label row="2" :text="checkVersion()" horizontalAlignment="center" verticalAlignment="top" style="color: #BEBEBE;" />
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
import { Application } from '@nativescript/core';
export default {
    methods: {
        easterEgg: function () {
            this.count++;
            if(this.count === 10) {
                prompt({
                    title: "개발자 정보",
                    message: "코드를 입력하세요.",
                    okButtonText: "OK",
                    cancelButtonText: "Cancel",
                    defaultText: "",
                })
                .then(result => {
                    if(result.text === "2022") {
                        alert({
                            title: "개발자 정보",
                            message: "전북대학교병원 임상약리센터\n- 김민걸\n- 박현주",
                            okButtonText: "OK"
                        })
                        .then(() => {});
                    }
                });
            }

            if(this.count===1) {
                setTimeout(function () {
                    this.count = 0;
                }.bind(this), 7000);
            }
        },
        isLatest: function() {
            return "최신 버전을 사용 중입니다";
        },
        checkVersion: function() {
            var version;
            if(Application.android){
                var packageManager = Application.android.context.getPackageManager();
                version = packageManager.getPackageInfo(Application.android.context.getPackageName(), 0).versionName;
            } else {
                version = NSBundle.mainBundle.infoDictionary.objectForKey("CFBundleVersion");
            }

            return "현재 버전: " + version;
        },
    },
    data() {
        return {
            count: 0,
        }
    },
}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles
    // text-align:center;
    // 
    .passwordBtn {
        border: none;
        box-shadow: none;
        color: #004097; 
        font-size: 22;
    }
</style>
