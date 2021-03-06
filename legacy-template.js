"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_props_1 = require("./bootstrap-props");
function legacyBootstrapTemplate(params) {
    return {
        Description: 'The CDK Toolkit Stack. It was created by `cdk bootstrap` and manages resources necessary for managing your Cloud Applications with AWS CDK.',
        Resources: {
            StagingBucket: {
                Type: 'AWS::S3::Bucket',
                Properties: {
                    BucketName: params.bucketName,
                    AccessControl: 'Private',
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [{
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'aws:kms',
                                    KMSMasterKeyID: params.kmsKeyId,
                                },
                            }],
                    },
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: true,
                        BlockPublicPolicy: true,
                        IgnorePublicAcls: true,
                        RestrictPublicBuckets: true,
                    },
                },
            },
            StagingBucketPolicy: {
                Type: 'AWS::S3::BucketPolicy',
                Properties: {
                    Bucket: { Ref: 'StagingBucket' },
                    PolicyDocument: {
                        Id: 'AccessControl',
                        Version: '2012-10-17',
                        Statement: [
                            {
                                Sid: 'AllowSSLRequestsOnly',
                                Action: 's3:*',
                                Effect: 'Deny',
                                Resource: [
                                    { 'Fn::Sub': '${StagingBucket.Arn}' },
                                    { 'Fn::Sub': '${StagingBucket.Arn}/*' },
                                ],
                                Condition: {
                                    Bool: { 'aws:SecureTransport': 'false' },
                                },
                                Principal: '*',
                            },
                        ],
                    },
                },
            },
        },
        Outputs: {
            [bootstrap_props_1.BUCKET_NAME_OUTPUT]: {
                Description: 'The name of the S3 bucket owned by the CDK toolkit stack',
                Value: { Ref: 'StagingBucket' },
            },
            [bootstrap_props_1.BUCKET_DOMAIN_NAME_OUTPUT]: {
                Description: 'The domain name of the S3 bucket owned by the CDK toolkit stack',
		Value: 'localhost:4572/EmpireLocalBucket'
            },
        },
    };
}
exports.legacyBootstrapTemplate = legacyBootstrapTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LXRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGVnYWN5LXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQTJHO0FBRTNHLFNBQWdCLHVCQUF1QixDQUFDLE1BQStCO0lBQ3JFLE9BQU87UUFDTCxXQUFXLEVBQUUsNklBQTZJO1FBQzFKLFNBQVMsRUFBRTtZQUNULGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUU7b0JBQ1YsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO29CQUM3QixhQUFhLEVBQUUsU0FBUztvQkFDeEIsZ0JBQWdCLEVBQUU7d0JBQ2hCLGlDQUFpQyxFQUFFLENBQUM7Z0NBQ2xDLDZCQUE2QixFQUFFO29DQUM3QixZQUFZLEVBQUUsU0FBUztvQ0FDdkIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxRQUFRO2lDQUNoQzs2QkFDRixDQUFDO3FCQUNIO29CQUNELDhCQUE4QixFQUFFO3dCQUM5QixlQUFlLEVBQUUsSUFBSTt3QkFDckIsaUJBQWlCLEVBQUUsSUFBSTt3QkFDdkIsZ0JBQWdCLEVBQUUsSUFBSTt3QkFDdEIscUJBQXFCLEVBQUUsSUFBSTtxQkFDNUI7aUJBQ0Y7YUFDRjtZQUNELG1CQUFtQixFQUFFO2dCQUNuQixJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixVQUFVLEVBQUU7b0JBQ1YsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTtvQkFDaEMsY0FBYyxFQUFFO3dCQUNkLEVBQUUsRUFBRSxlQUFlO3dCQUNuQixPQUFPLEVBQUUsWUFBWTt3QkFDckIsU0FBUyxFQUFFOzRCQUNUO2dDQUNFLEdBQUcsRUFBRSxzQkFBc0I7Z0NBQzNCLE1BQU0sRUFBRSxNQUFNO2dDQUNkLE1BQU0sRUFBRSxNQUFNO2dDQUNkLFFBQVEsRUFBRTtvQ0FDUixFQUFFLFNBQVMsRUFBRSxzQkFBc0IsRUFBRTtvQ0FDckMsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUU7aUNBQ3hDO2dDQUNELFNBQVMsRUFBRTtvQ0FDVCxJQUFJLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUU7aUNBQ3pDO2dDQUNELFNBQVMsRUFBRSxHQUFHOzZCQUNmO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELE9BQU8sRUFBRTtZQUNQLENBQUMsb0NBQWtCLENBQUMsRUFBRTtnQkFDcEIsV0FBVyxFQUFFLDBEQUEwRDtnQkFDdkUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTthQUNoQztZQUNELENBQUMsMkNBQXlCLENBQUMsRUFBRTtnQkFDM0IsV0FBVyxFQUFFLGlFQUFpRTtnQkFDOUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDLEVBQUU7YUFDakU7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDO0FBOURELDBEQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb3RzdHJhcHBpbmdQYXJhbWV0ZXJzLCBCVUNLRVRfRE9NQUlOX05BTUVfT1VUUFVULCBCVUNLRVRfTkFNRV9PVVRQVVQgfSBmcm9tICcuL2Jvb3RzdHJhcC1wcm9wcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWdhY3lCb290c3RyYXBUZW1wbGF0ZShwYXJhbXM6IEJvb3RzdHJhcHBpbmdQYXJhbWV0ZXJzKTogYW55IHtcbiAgcmV0dXJuIHtcbiAgICBEZXNjcmlwdGlvbjogJ1RoZSBDREsgVG9vbGtpdCBTdGFjay4gSXQgd2FzIGNyZWF0ZWQgYnkgYGNkayBib290c3RyYXBgIGFuZCBtYW5hZ2VzIHJlc291cmNlcyBuZWNlc3NhcnkgZm9yIG1hbmFnaW5nIHlvdXIgQ2xvdWQgQXBwbGljYXRpb25zIHdpdGggQVdTIENESy4nLFxuICAgIFJlc291cmNlczoge1xuICAgICAgU3RhZ2luZ0J1Y2tldDoge1xuICAgICAgICBUeXBlOiAnQVdTOjpTMzo6QnVja2V0JyxcbiAgICAgICAgUHJvcGVydGllczoge1xuICAgICAgICAgIEJ1Y2tldE5hbWU6IHBhcmFtcy5idWNrZXROYW1lLFxuICAgICAgICAgIEFjY2Vzc0NvbnRyb2w6ICdQcml2YXRlJyxcbiAgICAgICAgICBCdWNrZXRFbmNyeXB0aW9uOiB7XG4gICAgICAgICAgICBTZXJ2ZXJTaWRlRW5jcnlwdGlvbkNvbmZpZ3VyYXRpb246IFt7XG4gICAgICAgICAgICAgIFNlcnZlclNpZGVFbmNyeXB0aW9uQnlEZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgU1NFQWxnb3JpdGhtOiAnYXdzOmttcycsXG4gICAgICAgICAgICAgICAgS01TTWFzdGVyS2V5SUQ6IHBhcmFtcy5rbXNLZXlJZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgUHVibGljQWNjZXNzQmxvY2tDb25maWd1cmF0aW9uOiB7XG4gICAgICAgICAgICBCbG9ja1B1YmxpY0FjbHM6IHRydWUsXG4gICAgICAgICAgICBCbG9ja1B1YmxpY1BvbGljeTogdHJ1ZSxcbiAgICAgICAgICAgIElnbm9yZVB1YmxpY0FjbHM6IHRydWUsXG4gICAgICAgICAgICBSZXN0cmljdFB1YmxpY0J1Y2tldHM6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBTdGFnaW5nQnVja2V0UG9saWN5OiB7XG4gICAgICAgIFR5cGU6ICdBV1M6OlMzOjpCdWNrZXRQb2xpY3knLFxuICAgICAgICBQcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgQnVja2V0OiB7IFJlZjogJ1N0YWdpbmdCdWNrZXQnIH0sXG4gICAgICAgICAgUG9saWN5RG9jdW1lbnQ6IHtcbiAgICAgICAgICAgIElkOiAnQWNjZXNzQ29udHJvbCcsXG4gICAgICAgICAgICBWZXJzaW9uOiAnMjAxMi0xMC0xNycsXG4gICAgICAgICAgICBTdGF0ZW1lbnQ6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFNpZDogJ0FsbG93U1NMUmVxdWVzdHNPbmx5JyxcbiAgICAgICAgICAgICAgICBBY3Rpb246ICdzMzoqJyxcbiAgICAgICAgICAgICAgICBFZmZlY3Q6ICdEZW55JyxcbiAgICAgICAgICAgICAgICBSZXNvdXJjZTogW1xuICAgICAgICAgICAgICAgICAgeyAnRm46OlN1Yic6ICcke1N0YWdpbmdCdWNrZXQuQXJufScgfSxcbiAgICAgICAgICAgICAgICAgIHsgJ0ZuOjpTdWInOiAnJHtTdGFnaW5nQnVja2V0LkFybn0vKicgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIENvbmRpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgQm9vbDogeyAnYXdzOlNlY3VyZVRyYW5zcG9ydCc6ICdmYWxzZScgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFByaW5jaXBhbDogJyonLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIE91dHB1dHM6IHtcbiAgICAgIFtCVUNLRVRfTkFNRV9PVVRQVVRdOiB7XG4gICAgICAgIERlc2NyaXB0aW9uOiAnVGhlIG5hbWUgb2YgdGhlIFMzIGJ1Y2tldCBvd25lZCBieSB0aGUgQ0RLIHRvb2xraXQgc3RhY2snLFxuICAgICAgICBWYWx1ZTogeyBSZWY6ICdTdGFnaW5nQnVja2V0JyB9LFxuICAgICAgfSxcbiAgICAgIFtCVUNLRVRfRE9NQUlOX05BTUVfT1VUUFVUXToge1xuICAgICAgICBEZXNjcmlwdGlvbjogJ1RoZSBkb21haW4gbmFtZSBvZiB0aGUgUzMgYnVja2V0IG93bmVkIGJ5IHRoZSBDREsgdG9vbGtpdCBzdGFjaycsXG4gICAgICAgIFZhbHVlOiB7ICdGbjo6R2V0QXR0JzogWydTdGFnaW5nQnVja2V0JywgJ1JlZ2lvbmFsRG9tYWluTmFtZSddIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59Il19
