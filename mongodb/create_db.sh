#!/usr/bin/env bash

mongo << EOF

use favorite_course

db.favorite_course.insert({
	activity:"test1",
	created_at: new Date,
	due_date_at: null,
	activity_checked: true
})

show collections


EOF
