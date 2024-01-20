fetch("courses.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (courses) {
        console.log(courses);
        let content__body = document.querySelector(".content__body");
        const showInHtml = courses.map(function (course, index) {
            return `
                <div class="card">
                    <div class="card_img">
                        <img src=${encodeURI(course.imgUrl)} alt="">
                    </div>
                    <div class="card_info">
                    <div class="course_name">
                        <p>${course.courseName}</p>
                        <img src="quantum screen assets/icons/favourite.svg" alt="">
                    </div>
                    <div class="course_subject">${course.courseSubject} &nbsp;|&nbsp; Grade ${course.courseGrade} <span>+${course.additionalCourseGrade}</span>
                    </div>
                    <div class="course_length">
                        ${course.courseLength.units} <span>Units </span>${course.courseLength.lessons} <span>Lessons</span> ${course.courseLength.topics} <span>Topics</span>
                    </div>
                    <div class="course_class">
                        <p${course.courseClass === null
                    ? ` style="color:#686868"`
                    : ``
                }>
                        ${course.courseClass !== null
                    ? course.courseClass
                    : `No Classes`
                }
                        </p>
                        <img src="quantum screen assets/icons/arrow-down.svg" alt="" />
                    </div> 

                    ${course.courseEnrollInfo.totalStudents !== null
                    ? `<div class="course_enroll_info">${course.courseEnrollInfo.totalStudents} students &nbsp;`
                    :
                    `<div class="course_enroll_info">`
                }
                    ${course.courseEnrollInfo.startingDate !== null
                    ? `| &nbsp;${course.courseEnrollInfo.startingDate} - ${course.courseEnrollInfo.endingDate}</div>`
                    : `</div>`
                }

                    </div>

                    <div class="card_footer">
                    <img src="quantum screen assets/icons/preview.svg" alt=""
                    ${!course.previewIsActive
                    ? ` style="opacity : 40%"`
                    : ``}
                    >
                    <img src="quantum screen assets/icons/manage course.svg " alt=""
                    ${!course.manageIsActive
                    ? ` style="opacity : 40%"`
                    : ``}
                    >
                    <img src="quantum screen assets/icons/grade submissions.svg" alt=""
                    ${!course.gradeIsActive
                    ? ` style="opacity : 40%"`
                    : ``}
                    >
                    <img src="quantum screen assets/icons/reports.svg" alt=""
                    ${!course.reportsIsActive
                    ? ` style="opacity : 40%"`
                    : ``}
                    >
                    </div>
                </div>
        `
        }).join('');

        content__body.innerHTML = showInHtml;
    })

fetch("alert.json").then(function (response) { return response.json() }).then(function (alerts) {
    console.log(alerts);
    let alertsComp = document.querySelector(".alerts");
    const bg = "background-color:white;";
    const showInHtml = alerts.map(function (alert, index) {
        return `
            <div class="alertdata" style="${alert.bgcolor == 1 ? bg : ""}">
                <div class="alertflex">
                    <div class="alertcontent">${alert.content}</div>
                    <img src=${encodeURI(alert.image)} alt="" class="alertimage">
                </div>
                <div class="alertcourse"><span>${alert.course.course1}</span><b>${alert.course.msg}</b></div>
                <div class="alertdate">${alert.date}</div>
            </div>
        `
    }).join('');

    alertsComp.innerHTML = showInHtml;
})

fetch("announcements.json").then(function (response) { return response.json() }).then(function (announcements){
    console.log(announcements);
    let announcementsComp = document.querySelector(".announcements");
    const showInHtml = announcements.map(function (announcement,index){
        return `
        <div class="announcementdata" ${ announcement.bgcolor===1 ? `style=background-color:white;` : ``}>
            <div class="announcementflex">
                <div class="announcementname">
                    <span>${announcement.name.designation}:</span>&nbsp;${announcement.name.fullname}
                </div>
                <img
                    src="${announcement.image}"
                    alt=""
                    class="announcementimage"
                />
            </div>
            <div class="announcementcontent">${announcement.lecture}</div>
            <div class="announcementcourse">${announcement.course}</div>
            <div class="filedate">
            <div class="file">
            ${announcement.ig==1 ? `<img src="quantum screen assets/icons/fileAttach.png" alt="">&nbsp;`:``}${announcement.files}
            </div>
            <div class="announcementdate">${announcement.date}</div>
            </div>
         </div>
        
        `
    }).join('');

    announcementsComp.innerHTML = showInHtml;

})

function h() {
    let menu = document.querySelector('.menu');
    if (window.innerWidth <= 768) {
        menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
    }
}

function alertFunction() {

    let alert_dropdown = document.querySelector('.alert_dropdown');
    alert_dropdown.style.display = ((alert_dropdown.style.display === "none" || alert_dropdown.style.display === "")?"block":"none");
}

function announcementFunction() {

    let announcement_dropdown = document.querySelector('.announcement_dropdown');
    announcement_dropdown.style.display = ((announcement_dropdown.style.display === "none" || announcement_dropdown.style.display === "")?"block":"none");

}



// Close the menu when the window is resized above 768px
window.addEventListener('resize', function () {
    var menu = document.querySelector('.menu');

    if (window.innerWidth > 768) {
        menu.style.display = "flex";
    }
    else {
        menu.style.display = "none";
    }
})