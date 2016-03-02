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

sed -i "s/\"theme\": \".*\",/\"theme\": \"${THEME}\",/g" ./config/config.js