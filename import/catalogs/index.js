var recipes = [
	{
		"name": "Dev Nginx Recipe",
		"type": "server",
		"subtype": "nginx",
		"description": "This is the nginx catalog recipe used to deploy the nginx in the dev environment.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "nginx",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"readinessProbe": {
					"httpGet": {
						"path": "/",
						"port": "http"
					},
					"initialDelaySeconds": 5,
					"timeoutSeconds": 2,
					"periodSeconds": 5,
					"successThreshold": 1,
					"failureThreshold": 3
				},
				"restartPolicy": {
					"condition": "any",
					"maxAttempts": 5
				},
				"container": {
					"network": "soajsnet",
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [
						{
							"Type": "volume",
							"Source": "soajs_log_volume",
							"Target": "/var/log/soajs/"
						},
						{
							"Type": "bind",
							"ReadOnly": true,
							"Source": "/var/run/docker.sock",
							"Target": "/var/run/docker.sock"
						}
					]
				},
				"ports": [
					{
						"name": "http",
						"target": 80,
						"isPublished": true,
						"published": 81,
						"preserveClientIP": true
					},
					{
						"name": "https",
						"target": 443,
						"isPublished": true,
						"published": 444,
						"preserveClientIP": true
					}
				]
			},
			"buildOptions": {
				"env": {
					"SOAJS_ENV": {
						"type": "computed",
						"value": "$SOAJS_ENV"
					},
					"SOAJS_NX_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_DOMAIN"
					},
					"SOAJS_NX_API_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_API_DOMAIN"
					},
					"SOAJS_NX_SITE_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_NX_SITE_DOMAIN"
					},
					"SOAJS_NX_CONTROLLER_NB": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_NB"
					},
					"SOAJS_NX_CONTROLLER_IP": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_IP_N"
					},
					"SOAJS_NX_CONTROLLER_PORT": {
						"type": "computed",
						"value": "$SOAJS_NX_CONTROLLER_PORT"
					},
					"SOAJS_DEPLOY_HA": {
						"type": "computed",
						"value": "$SOAJS_DEPLOY_HA"
					},
					"SOAJS_HA_NAME": {
						"type": "computed",
						"value": "$SOAJS_HA_NAME"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"bash"
						],
						"args": [
							"-c",
							"node index.js -T nginx"
						]
					}
				}
			}
		}
	}, {
		"name": "Dev Service Recipe",
		"type": "service",
		"subtype": "soajs",
		"description": "This is the service catalog recipe used to deploy the core services in the dev environment.",
		"recipe": {
			"deployOptions": {
				"image": {
					"prefix": "soajsorg",
					"name": "soajs",
					"tag": "latest",
					"pullPolicy": "IfNotPresent"
				},
				"specifyGitConfiguration": true,
				"readinessProbe": {
					"httpGet": {
						"path": "/heartbeat",
						"port": "maintenance"
					},
					"initialDelaySeconds": 5,
					"timeoutSeconds": 2,
					"periodSeconds": 5,
					"successThreshold": 1,
					"failureThreshold": 3
				},
				"restartPolicy": {
					"condition": "any",
					"maxAttempts": 5
				},
				"container": {
					"network": "soajsnet",
					"workingDir": "/opt/soajs/deployer/"
				},
				"voluming": {
					"volumes": [
						{
							"Type": "volume",
							"Source": "soajs_log_volume",
							"Target": "/var/log/soajs/"
						},
						{
							"Type": "bind",
							"ReadOnly": true,
							"Source": "/var/run/docker.sock",
							"Target": "/var/run/docker.sock"
						}
					]
				}
			},
			"buildOptions": {
				"settings": {
					"accelerateDeployment": true
				},
				"env": {
					"NODE_ENV": {
						"type": "static",
						"value": "production"
					},
					"NODE_TLS_REJECT_UNAUTHORIZED": {
						"type": "static",
						"value": "0"
					},
					"SOAJS_ENV": {
						"type": "computed",
						"value": "$SOAJS_ENV"
					},
					"SOAJS_PROFILE": {
						"type": "static",
						"value": "/opt/soajs/FILES/profiles/profile.js"
					},
					"SOAJS_SRV_AUTOREGISTERHOST": {
						"type": "static",
						"value": "true"
					},
					"SOAJS_SRV_MEMORY": {
						"type": "computed",
						"value": "$SOAJS_SRV_MEMORY"
					},
					"SOAJS_SRV_MAIN": {
						"type": "computed",
						"value": "$SOAJS_SRV_MAIN"
					},
					"SOAJS_GC_NAME": {
						"type": "computed",
						"value": "$SOAJS_GC_NAME"
					},
					"SOAJS_GC_VERSION": {
						"type": "computed",
						"value": "$SOAJS_GC_VERSION"
					},
					"SOAJS_GIT_PROVIDER": {
						"type": "computed",
						"value": "$SOAJS_GIT_PROVIDER"
					},
					"SOAJS_GIT_DOMAIN": {
						"type": "computed",
						"value": "$SOAJS_GIT_DOMAIN"
					},
					"SOAJS_GIT_OWNER": {
						"type": "computed",
						"value": "$SOAJS_GIT_OWNER"
					},
					"SOAJS_GIT_BRANCH": {
						"type": "computed",
						"value": "$SOAJS_GIT_BRANCH"
					},
					"SOAJS_GIT_COMMIT": {
						"type": "computed",
						"value": "$SOAJS_GIT_COMMIT"
					},
					"SOAJS_GIT_REPO": {
						"type": "computed",
						"value": "$SOAJS_GIT_REPO"
					},
					"SOAJS_GIT_TOKEN": {
						"type": "computed",
						"value": "$SOAJS_GIT_TOKEN"
					},
					"SOAJS_DEPLOY_HA": {
						"type": "computed",
						"value": "$SOAJS_DEPLOY_HA"
					},
					"SOAJS_HA_NAME": {
						"type": "computed",
						"value": "$SOAJS_HA_NAME"
					},
					"SOAJS_MONGO_NB": {
						"type": "computed",
						"value": "$SOAJS_MONGO_NB"
					},
					"SOAJS_MONGO_PREFIX": {
						"type": "computed",
						"value": "$SOAJS_MONGO_PREFIX"
					},
					"SOAJS_MONGO_RSNAME": {
						"type": "computed",
						"value": "$SOAJS_MONGO_RSNAME"
					},
					"SOAJS_MONGO_AUTH_DB": {
						"type": "computed",
						"value": "$SOAJS_MONGO_AUTH_DB"
					},
					"SOAJS_MONGO_SSL": {
						"type": "computed",
						"value": "$SOAJS_MONGO_SSL"
					},
					"SOAJS_MONGO_IP": {
						"type": "computed",
						"value": "$SOAJS_MONGO_IP_N"
					},
					"SOAJS_MONGO_PORT": {
						"type": "computed",
						"value": "$SOAJS_MONGO_PORT_N"
					},
					"SOAJS_DEPLOY_ACC": {
						"type": "static",
						"value": "true"
					}
				},
				"cmd": {
					"deploy": {
						"command": [
							"bash"
						],
						"args": [
							"-c",
							"node index.js -T service"
						]
					}
				}
			}
		}
	}];

module.exports = recipes;