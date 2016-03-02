#!/bin/bash

echo ''
echo '------------------------ THEME -----------------------------------'
if [ $1 ]; then
THEME=${1}
echo ${THEME}
else
read THEME
THEME=${THEME:='skeleton'}
fi
echo '------------------------------------------------------------------'
echo ''

if ! [ -d ./themes/${THEME} ]; then
git clone https://github.com/CinemaPress/Theme-${THEME}.git ./themes/${THEME}
fi

sed -i "s/\"theme\": \".*\",/\"theme\": \"${THEME}\",/g" ./config/config.js