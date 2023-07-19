import { DocumentBuilder } from '@nestjs/swagger';

export default class SwaggerCustomConfig {
  config() {
    return new DocumentBuilder()
      .setTitle('Api New Space')
      .setDescription('Api da solução Credit as Service New Space')
      .setVersion('1.0.0')
      .build();
  }
}
