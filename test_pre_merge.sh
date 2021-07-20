#!/bin/bash
set -e


#Проверка изменения версии, при мерже.

function ftrap() { echo end; git checkout $current_commit > /dev/null 2>&1; }
current_commit=$(git rev-parse --verify HEAD)
trap "ftrap" EXIT


current_version=$(npm run env | grep -E "npm_package_version" | awk -F"=" '{print $2}')
git checkout -f master > /dev/null 2>&1
previous_version=$(npm run env | grep -E "npm_package_version" | awk -F"=" '{print $2}')

function version_gt() { printf '%s\n' "$@" | sort -V | tail -n1; }
function exit_error() { echo $@; exit 1;}

echo $current_version $previous_version

[[ $current_version = $previous_version ]] && exit_error no changed version


[[ $(version_gt $previous_version $current_version) = $current_version ]] || exit_error there is a newer version.