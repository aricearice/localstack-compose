#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestStack = void 0;
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
const logs = require("@aws-cdk/aws-logs");
const lambda = require("@aws-cdk/aws-lambda");
class TestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.id = id;
        this.lambdaRole = this.setupLambdaRole();
        this.lambda = this.setupLambda();
    }
    setupLambdaRole() {
        const role = new iam.Role(this, 'lamba-execution-role', {
            roleName: `TestLambdaBasicExecutionRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaBasicExecutionRole')
            ]
        });
        return {
            role
        };
    }
    setupLambda() {
        new lambda.Function(this, 'testLambda', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            timeout: cdk.Duration.seconds(300),
            code: lambda.Code.fromInline('./lambda'),
            logRetention: logs.RetentionDays.ONE_MONTH,
            role: this.lambdaRole.role,
            logRetentionRole: this.lambdaRole.role
        });
        return;
    }
}
exports.TestStack = TestStack;
const app = new cdk.App();
new TestStack(app, `Local`, {
    stackEnv: 'local',
    env: {
        region: 'us-east-1',
        account: '000000000000'
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsdUNBQXFDO0FBQ3JDLHFDQUFzQztBQUN0Qyx3Q0FBeUM7QUFDekMsMENBQTJDO0FBQzNDLDhDQUErQztBQVkvQyxNQUFhLFNBQVUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUt0QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQ2pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLGVBQWU7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUN0RCxRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzRCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyw2QkFBNkIsQ0FBQzthQUMxRTtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxJQUFJO1NBQ0wsQ0FBQTtJQUNILENBQUM7SUFFTyxXQUFXO1FBRWpCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3RDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3hDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7WUFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTtZQUMxQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsT0FBTTtJQUNSLENBQUM7Q0FFRjtBQTVDRCw4QkE0Q0M7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzFCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLEdBQUcsRUFBRTtRQUNILE1BQU0sRUFBRSxXQUFXO1FBQ25CLE9BQU8sRUFBRSxjQUFjO0tBQ3hCO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCBpYW0gPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtaWFtJyk7XG5pbXBvcnQgbG9ncyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1sb2dzJyk7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0IHsgTGFtYmRhRGVzdGluYXRpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtbG9ncy1kZXN0aW5hdGlvbnMnO1xuXG5pbnRlcmZhY2UgVGVzdFN0YWNrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gIHN0YWNrRW52OiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFNlcnZpY2VQcm9wcyB7XG4gIG5hbWU6IHN0cmluZztcbiAgcG9ydDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVGVzdFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgaWQ6IHN0cmluZztcbiAgbGFtYmRhOiBhbnk7XG4gIGxhbWJkYVJvbGU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFRlc3RTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICB0aGlzLmlkID0gaWQ7XG5cbiAgICB0aGlzLmxhbWJkYVJvbGUgPSB0aGlzLnNldHVwTGFtYmRhUm9sZSgpO1xuXG4gICAgdGhpcy5sYW1iZGEgPSB0aGlzLnNldHVwTGFtYmRhKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTGFtYmRhUm9sZSgpIHtcbiAgICBjb25zdCByb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdsYW1iYS1leGVjdXRpb24tcm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgVGVzdExhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScpXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm9sZVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBMYW1iZGEoKSB7XG5cbiAgICBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICd0ZXN0TGFtYmRhJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZSgnLi9sYW1iZGEnKSxcbiAgICAgIGxvZ1JldGVudGlvbjogbG9ncy5SZXRlbnRpb25EYXlzLk9ORV9NT05USCxcbiAgICAgIHJvbGU6IHRoaXMubGFtYmRhUm9sZS5yb2xlLFxuICAgICAgbG9nUmV0ZW50aW9uUm9sZTogdGhpcy5sYW1iZGFSb2xlLnJvbGVcbiAgICB9KTtcblxuICAgIHJldHVyblxuICB9XG5cbn1cblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxubmV3IFRlc3RTdGFjayhhcHAsIGBMb2NhbGAsIHtcbiAgc3RhY2tFbnY6ICdsb2NhbCcsXG4gIGVudjoge1xuICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXG4gICAgYWNjb3VudDogJzAwMDAwMDAwMDAwMCdcbiAgfVxufSk7XG4iXX0=