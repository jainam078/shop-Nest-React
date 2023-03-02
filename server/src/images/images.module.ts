import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    FilesModule
  ],
  controllers: [],
  providers: [ImagesService],
  exports: [ImagesService]
})
export class ImagesModule { }
