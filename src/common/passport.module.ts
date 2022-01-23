import {PassportModule} from "@nestjs/passport";

/**
 * Add to module imports everywhere where AuthGuard with default strategy is to be used.
 */
export default PassportModule.register({defaultStrategy: "jwt"});
