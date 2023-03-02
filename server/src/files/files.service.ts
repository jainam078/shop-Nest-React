import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'


@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            if (!file) return
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, "..", 'static/uploads')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            throw new HttpException('Error when file writing', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(fileName) {
        try {
            const filePath = path.resolve(__dirname, "..", 'static/uploads')
            await fs.unlinkSync(`${filePath}/${fileName}`)
        } catch (error) {
            throw new HttpException('Error when file deleting', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
